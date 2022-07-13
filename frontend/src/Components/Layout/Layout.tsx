import {
  Anchor,
  AppShell,
  Box,
  Breadcrumbs,
  Center,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { ReactNode } from "react";
import { Book, ChartBar, Home, Meat } from "tabler-icons-react";
import AppNavbar from "./AppNavbar";

interface Props {
  activeTab: 0 | 1 | 2;
  children: ReactNode;
}

const indexNameMapping = {
  0: "Dashboard",
  1: "Ingredients",
  2: "Cookbook",
};

const indexIconMapping = {
  0: <ChartBar size={16} />,
  1: <Meat size={16} />,
  2: <Book size={16} />,
};

const Layout: React.FC<Props> = ({ activeTab, children }) => {
  const theme = useMantineTheme();

  return (
    <AppShell navbar={<AppNavbar activeTab={activeTab} />} padding={0}>
      <Stack
        py={16}
        sx={{
          height: "100vh",
        }}
      >
        <Box
          sx={{ height: 48, display: "flex", alignItems: "center" }}
          px={16}
        >
          <Breadcrumbs>
            <Center>
              <Home
                size={16}
                style={{ color: `${theme.colors.gray[7]}` }}
              />
            </Center>
            <Anchor href='#' key={indexNameMapping[activeTab]}>
              <Text size='md'>{indexNameMapping[activeTab]}</Text>
            </Anchor>
          </Breadcrumbs>
        </Box>
        <Box
          sx={{
            height: `calc(100vh - 64px)`,
            overflowY: "scroll",
          }}
        >
          <Stack spacing={16} px={16} sx={{ height: "100%" }}>
            {children}
          </Stack>
        </Box>
      </Stack>
    </AppShell>
  );
};

export default Layout;
