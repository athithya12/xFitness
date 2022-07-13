import { Box, Navbar, Space, Tabs } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Book, ChartBar, Meat } from "tabler-icons-react";
import Profile from "./Profile";

const routes: any = {
  0: "/dashboard",
  1: "/ingredients",
  2: "/cookbook",
};

interface Props {
  activeTab: 0 | 1 | 2 | 3;
}

const AppNavbar: React.FC<Props> = ({ activeTab }) => {
  const navigate = useNavigate();

  return (
    <Navbar
      width={{ base: "auto" }}
      height='100vh'
      hidden={true}
      hiddenBreakpoint='md'
      sx={{ width: 280, padding: "16px" }}
    >
      <Navbar.Section
      // sx={(theme) => ({
      //   borderBottom: `1px solid ${theme.colors.gray[3]}`,
      //   paddingBottom: "16px",
      // })}
      >
        <Box sx={{ height: 48, backgroundColor: "ButtonFace" }} />
      </Navbar.Section>
      <Space h={16} />
      <Navbar.Section grow>
        <Tabs
          active={activeTab}
          onTabChange={(tabIndex) => {
            navigate(routes[tabIndex]);
          }}
          orientation='vertical'
          variant='pills'
          styles={{
            tabsListWrapper: {
              width: "100%",
            },
            // @ts-ignore
            pills: {
              marginRight: 0,
            },
          }}
        >
          <Tabs.Tab label='Dashboard' icon={<ChartBar size={16} />} />
          <Tabs.Tab label='Ingredients' icon={<Meat size={16} />} />
          <Tabs.Tab label='Cookbook' icon={<Book size={16} />} />
        </Tabs>
      </Navbar.Section>
      <Space h={16} />
      <Navbar.Section
        sx={(theme) => ({
          borderTop: `1px solid ${theme.colors.gray[3]}`,
          paddingTop: "16px",
        })}
      >
        <Profile />
      </Navbar.Section>
    </Navbar>
  );
};

export default AppNavbar;
