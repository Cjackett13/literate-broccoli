from flask import Flask, render_template
import pandas as pd
import os

app = Flask(__name__)

@app.route("/dashboard")
def dashboard():
    if not os.path.exists("journal_log.csv"):
        return "No journal data available yet."

    df = pd.read_csv("journal_log.csv")

    # Ensure timestamp is datetime
    df["timestamp"] = pd.to_datetime(df["timestamp"])

    # Insights
    total_entries = len(df)
    mood_counts = df["mood"].value_counts().to_dict()

  
    most_common_mood = max(mood_counts, key=mood_counts.get)

    tips = {
    "positive": "Keep up the good vibes! Try reflecting on what made you feel great today.",
    "neutral": "You're coasting — maybe take a walk or journal about what could make the day better.",
    "negative": "Rough day? Try some deep breathing or reach out to a friend for support."
  }

    wellness_tip = tips.get(most_common_mood, "Remember to check in with yourself today!")


    # Mood trend (date-wise)
    mood_trend = df.groupby(df["timestamp"].dt.date)["mood"].value_counts().unstack(fill_value=0).to_dict("index")

    return render_template("dashboard.html",
                           total_entries=total_entries,
                           mood_counts=mood_counts,
                           mood_trend=mood_trend
                           , wellness_tip=wellness_tip)

if __name__ == "__main__":
    app.run(debug=True)