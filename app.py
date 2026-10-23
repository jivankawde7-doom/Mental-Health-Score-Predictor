import streamlit as st
import requests

# Set page configuration
st.set_page_config(
    page_title="Student Mental Health Predictor",
    page_icon="🧠",
    layout="wide"
)

# Backend configuration
API_URL = "http://127.0.0.1:8000/predict"

# Header section
st.title("🧠 Student Mental Health Score Predictor")
st.markdown(
    "Enter demographic, academic, and behavioral habits below to get a predicted mental health score from the machine learning model."
)
st.write("---")

# Layout: Split inputs across two distinct columns
col1, col2 = st.columns(2, gap="large")

with col1:
    st.subheader("📋 Demographic & Academic Profile")
    age = st.slider("Age", min_value=10, max_value=100, value=21, step=1)
    gender = st.selectbox("Gender", options=["Male", "Female"])
    
    country = st.selectbox(
        "Country",
        options=[
            "India", "USA", "Canada", "Australia", "UK", 
            "Germany", "Mexico", "Turkey", "France", "Other"
        ]
    )
    
    academic_level = st.selectbox(
        "Academic Level",
        options=["High School", "Undergraduate", "Graduate"]
    )
    
    stress_level = st.select_slider(
        "Self-Reported Stress Level",
        options=["Low", "Medium", "High", "Very High"],
        value="Medium"
    )

with col2:
    st.subheader("📱 Digital & Lifestyle Habits")
    most_used_platform = st.selectbox(
        "Most Used Platform",
        options=[
            "YouTube", "Instagram", "TikTok", "LinkedIn", "Facebook",
            "Snapchat", "Twitter", "Whatsapp", "WeChat", "Line", "KakaoTalk", "VKontakte"
        ]
    )
    
    purpose_of_use = st.selectbox(
        "Primary Purpose of Use",
        options=["Education", "Entertainment", "Networking", "News"]
    )
    
    daily_unlocks = st.number_input("Daily Phone Unlocks", min_value=0, max_value=500, value=45, step=1)
    avg_daily_usage_hours = st.slider("Daily Screen/Social Media Usage (hrs)", 0.0, 24.0, 4.5, 0.5)
    study_hours = st.slider("Daily Study Hours", 0.0, 24.0, 5.0, 0.5)
    sleep_hours_per_night = st.slider("Sleep per Night (hrs)", 0.0, 24.0, 7.0, 0.5)
    physical_activity_hours = st.slider("Physical Activity per Day (hrs)", 0.0, 24.0, 1.0, 0.5)

st.write("---")

# Submit button & Inference call
predict_clicked = st.button("Generate Mental Health Prediction", type="primary", use_container_width=True)

if predict_clicked:
    payload = {
        "age": age,
        "gender": gender,
        "country": country,
        "academic_level": academic_level,
        "most_used_platform": most_used_platform,
        "purpose_of_use": purpose_of_use,
        "avg_daily_usage_hours": float(avg_daily_usage_hours),
        "daily_unlocks": int(daily_unlocks),
        "study_hours": float(study_hours),
        "physical_activity_hours": float(physical_activity_hours),
        "sleep_hours_per_night": float(sleep_hours_per_night),
        "stress_level": stress_level
    }

    with st.spinner("Querying FastAPI inference engine..."):
        try:
            response = requests.post(API_URL, json=payload, timeout=5)
            
            if response.status_code == 200:
                result = response.json()
                score = result.get("predicted_mental_health_score")
                
                st.success("Inference completed successfully!")
                
                # Metric display
                m_col1, m_col2 = st.columns([1, 2])
                with m_col1:
                    st.metric(label="Predicted Score", value=score)
                with m_col2:
                    st.info(
                        f"**Input Summary:** {gender}, {age} yrs old, studying at {academic_level} level with {sleep_hours_per_night}h sleep and {avg_daily_usage_hours}h screen time."
                    )
            elif response.status_code == 422:
                st.error("Validation Error (422): Input values do not match model constraints.")
                st.json(response.json())
            else:
                st.error(f"Server Error ({response.status_code}): {response.text}")

        except requests.exceptions.ConnectionError:
            st.error("Could not reach FastAPI. Make sure `uvicorn` is running on `http://127.0.0.1:8000`.")
        except Exception as e:
            st.error(f"Unexpected error: {str(e)}")