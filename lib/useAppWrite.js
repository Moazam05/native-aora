import { useEffect, useState } from "react";

const useAppWrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fn();

        if (!response) throw new Error("No videos found");
        setData(response);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const refetch = () => fetchVideos();

  return { data, isLoading, refetch };
};

export default useAppWrite;
