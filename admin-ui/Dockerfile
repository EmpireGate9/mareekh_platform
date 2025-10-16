# ===== المرحلة 1: البناء =====
FROM node:20-alpine AS build
WORKDIR /app

# نسخ ملفات التعريف وتثبيت التبعيات
COPY package*.json ./
RUN npm install

# نسخ باقي ملفات المشروع وبناء التطبيق
COPY . .
RUN npm run build

# ===== المرحلة 2: تشغيل التطبيق =====
FROM nginx:alpine
# نسخ ناتج البناء من المرحلة السابقة
COPY --from=build /app/dist /usr/share/nginx/html

# كشف المنفذ 80 لتشغيل التطبيق
EXPOSE 80

# تشغيل Nginx في الوضع الرئيسي
CMD ["nginx", "-g", "daemon off;"]
