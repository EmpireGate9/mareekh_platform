
# دليل النشر السريع — واجهات المنصة

## الإعداد
1) تثبيت الاعتمادات:
   ```bash
   npm install
   npm run build
   npm run preview  # اختياري محليًا
   ```

2) ضبط المتغيرات:
   - ضع رابط الـ API في ملف `.env`:
     ```
     VITE_API_BASE_URL=https://api.example.com
     ```

## خيار A — Render (Static Site)
- نوع الخدمة: Static Site
- Build Command: `npm run build`
- Publish Directory: `dist`
- إضافة Environment Variables: نفس `.env` (VITE_API_BASE_URL)
- تمكين "Auto-Deploy" عند كل رفع

## خيار B — Google Cloud Run (Nginx)
1) بناء الصورة:
   ```bash
   gcloud builds submit --tag gcr.io/PROJECT_ID/mareekh-portal
   gcloud run deploy mareekh-portal \
     --image gcr.io/PROJECT_ID/mareekh-portal \
     --region REGION --platform managed --allow-unauthenticated
   ```
2) قبل البناء شغّل:
   ```bash
   npm run build
   ```
   سيستخدم Nginx خدمة الملفات من مجلد `dist`.

## خيار C — Firebase Hosting (موصى به للواجهة الثابتة على GCP)
1) إعداد أولي:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   ```
2) عند السؤال عن "public directory" اختر: `dist`
3) بناء ونشر:
   ```bash
   npm run build
   firebase deploy
   ```

## مسارات افتراضية
- `/` صفحة الدخول
- `/dashboard` لوحة المؤشرات
- `/about` معلومات

> المصادقة بسيطة (token محلي). موصّى بتوصيلها بـ Keycloak/JWT عند الترقية.
