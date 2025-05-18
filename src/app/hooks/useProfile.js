import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { updateCredits, setUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const useProfile = (authToken) => {
  const [profile, setProfile] = useState({ credits: 0 });
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchProfile = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://gate-server-new.salmonsmoke-2ff84997.centralindia.azurecontainerapps.io/user/profile",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setProfile(response.data);
      console.log("Profile fetched:", response.data);
      dispatch(updateCredits({ credits: response.data.credits }));
      dispatch(setUser(response.data.name));
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  }, [authToken, dispatch]);

  useEffect(() => {
    if (!authToken) return;

    fetchProfile();
    const intervalId = setInterval(fetchProfile, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [authToken, fetchProfile]); // ✅ no warning now

  return { profile, loading, refreshProfile: fetchProfile };
};

export default useProfile;
