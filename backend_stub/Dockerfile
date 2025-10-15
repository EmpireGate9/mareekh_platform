# استخدام Python كبيئة أساسية
FROM python:3.11-slim

# تعيين مجلد العمل داخل الحاوية
WORKDIR /app

# نسخ الملفات من مجلد backend_stub إلى داخل الحاوية
COPY ./backend_stub /app

# تثبيت المتطلبات
RUN pip install --no-cache-dir -r requirements.txt

# فتح المنفذ 8000 للتطبيق
EXPOSE 8000

# تشغيل التطبيق باستخدام uvicorn
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
