import { useEffect } from "react";
import { motion } from "framer-motion";
import "./CitrinaSplash.css";

export default function CitrinaSplash({ onFinish }) {
  useEffect(() => {
    // مؤثرات بسيطة (تكرر نفس المنطق الموجود في effect.js الأصلي)
    const timer = setTimeout(() => {
      onFinish(); // بعد 5000 مللي ثانية، نغلق الـ splash
    }, 5000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="citrina-root">
      <div className="citrina-wrap">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="citrina-card"
        >
          <div className="logo-wrap">
            {/* يستخدم ملف svg الموجود في public/assets */}
            <img src="/assets/logo_citrina.svg" alt="Citrina Logo" />
          </div>

          <div className="citrina-title">🍊 Citrina</div>
          <div className="citrina-sub">Intelligent Launch System</div>

          <div className="progress-bar">
            <div className="progress-fill" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
