# Advanced Fitness & Calorie Dashboard

A comprehensive, gamified fitness tracking and calorie estimation dashboard built with pure HTML, CSS, and JavaScript. 

This tool goes beyond a basic BMI calculator by providing actionable caloric guidelines and body composition estimates, designed with a clean, modern interface.

## Features

*   **Comprehensive Calorie Engine:** Calculates Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) using the Mifflin-St Jeor equation.
*   **Targeted Weight Management:** Automatically generates daily calorie targets for weight maintenance, mild weight loss (0.25 kg/week), normal weight loss (0.5 kg/week), and extreme weight loss (1 kg/week).
*   **Advanced Body Composition:** Estimates Body Fat Percentage using the Deurenberg formula and calculates Lean Body Mass to provide better context than BMI alone.
*   **Gamified Health Score:** Evaluates overall fitness with a proprietary 0-100 score based on age, gender, BMI deviation, and body fat percentage.
*   **Granular Activity Levels:** Includes 7 distinct activity multipliers ranging from basic BMR to intense daily exercise for highly accurate calorie tracking.
*   **Unit Toggling:** Seamlessly switch between Metric (cm/kg) and US/Imperial (inches/lbs) units.

## Tech Stack

*   **Frontend:** HTML5
*   **Styling:** CSS3 (Flexbox, CSS Grid, custom UI components)
*   **Logic:** Vanilla JavaScript (ES6+)

## Project Structure

```text
├── index.html   # Main dashboard structure and UI
├── style.css    # Responsive styling and color themes
├── script.js    # Metric calculations, unit toggling, and DOM updates
└── README.md    # Project documentation
