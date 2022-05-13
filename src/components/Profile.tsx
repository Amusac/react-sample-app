import { ChangeEvent, FC, useState } from "react";
import Stack from "@mui/material/Stack";
import TextInputArea from "./TextInputArea";

import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";

type GitHubProfile = {
  login: string;
  name: string;
  avatar_url: string;
};

const Profile: FC = () => {
  const [profile, setProfile] = useState<GitHubProfile | undefined>(undefined);
  const [userName, setUserName] = useState("");
  const [profileNotFound, setProfileNotFound] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const onSubmit = async () => {
    const response = await fetch(`https://api.github.com/users/${userName}`);
    const data: GitHubProfile = await response.json();

    setProfile(response.ok ? data : undefined);
    setProfileNotFound(!response.ok);
  };

  return (
    <Stack spacing={1}>
      {/* profile の値がtruthy な場合に　<Card /> をrender する */}
      {profile && (
        <Card
          sx={{
            width: 300,
          }}
          onClick={() => {
            window.open(`https://github.com/${profile.login}`, "_blank");
          }}
        >
          <CardHeader
            avatar={<Avatar src={profile.avatar_url} />}
            title={profile.name}
            subheader={profile.login}
          />
        </Card>
      )}
      {profileNotFound && (
        <Alert severity="error">ユーザーの情報が取得できませんでした</Alert>
      )}
      <TextInputArea value={userName} onChange={onChange} onSubmit={onSubmit} />
    </Stack>
  );
};

export default Profile;
