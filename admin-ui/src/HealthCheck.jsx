import React, { useEffect, useState } from "react";

function HealthCheck() {
  const [status, setStatus] = useState("نحن نحاول الاتصال بالخلفية...");

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    console.log("Connecting to backend:", apiUrl);

    fetch(`${apiUrl}/health`)
      .then((res) => {
        if (!res.ok) throw new Error("Response not OK");
        return res.json();
      })
      .then((data) => setStatus(`${data.status} - ${data.service}`))
      .catch((err) => {
        console.error("Error connecting:", err);
        setStatus("حدث خطأ أثناء الاتصال بالخلفية ❌");
      });
  }, []);

  return (
    <div style={{ fontFamily: "Arial", padding: 20, direction: "rtl" }}>
      <h2>اختبار الاتصال بالخلفية</h2>
      <p>{status}</p>
    </div>
  );
}

export default HealthCheck;
