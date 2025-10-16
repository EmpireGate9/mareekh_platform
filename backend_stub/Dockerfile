# ===== المرحلة 1: الأساس =====
FROM python:3.11-slim

# تعيين مجلد العمل
WORKDIR /app

# تثبيت المتطلبات الأساسية للنظام
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# نسخ ملفات التعريف أولاً لتسريع الـ build
COPY requirements.txt .

# تثبيت التبعيات
RUN pip install --no-cache-dir -r requirements.txt

# نسخ باقي ملفات المشروع
COPY . .

# فتح المنفذ الافتراضي
EXPOSE 8000

# الأمر لتشغيل الخادم (FastAPI عبر Uvicorn)
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
