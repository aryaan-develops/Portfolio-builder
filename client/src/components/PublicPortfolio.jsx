import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Preview from './Preview'; // Hum purana design reuse karenge!

const PublicPortfolio = () => {
  const { username } = useParams(); // URL se username nikalega
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Database se data mangwana
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/portfolio/${username}`);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching portfolio", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [username]);

  if (loading) return <div className="text-center mt-20 text-2xl">Loading Portfolio... ⏳</div>;
  if (!data) return <div className="text-center mt-20 text-2xl text-red-500">Portfolio Not Found ❌</div>;

  return (
    <div className="min-h-screen">
      {/* Hum wahi Preview component use kar rahe hain jo Editor mein tha */}
      <Preview data={data} />
    </div>
  );
};

export default PublicPortfolio;