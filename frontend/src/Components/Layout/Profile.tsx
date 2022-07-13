import { useAuth0 } from "@auth0/auth0-react";
import { ActionIcon, Avatar, Group, Stack, Text } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { userStore } from "Stores";
import { Logout } from "tabler-icons-react";

const Profile = () => {
  const { logout } = useAuth0();

  const { user } = userStore;

  return (
    <Group
      sx={{ width: "100%", whiteSpace: "nowrap", display: "inline-flex" }}
    >
      <Avatar radius='xl' color='cyan'>
        {user?.firstName && user.firstName[0]}
      </Avatar>
      <Stack
        spacing={0}
        sx={{
          flexGrow: 1,
          width: "1%",
          whiteSpace: "nowrap",
        }}
      >
        <Text
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {user && user.firstName + " " + user.lastName}
        </Text>
        <Text size='xs'>{user && user.email}</Text>
      </Stack>
      <ActionIcon
        onClick={() => {
          logout();
        }}
      >
        <Logout size={48} />
      </ActionIcon>
    </Group>
  );
};

export default observer(Profile);
