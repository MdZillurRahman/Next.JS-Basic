"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SelectedProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const {data:session}=useSession()

  const [selectedProfilePost, setSelectedProfilePost] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();

      setSelectedProfilePost(data);
    };

    if (params?.id) {
      fetchPost();
    }
  }, []);

  return (
    <div>
      <Profile
        name={userName}
        welcomeNote={`Hello, ${session.user.name}.`}
        desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
        data={selectedProfilePost}
      />
    </div>
  );
};

export default SelectedProfile;
