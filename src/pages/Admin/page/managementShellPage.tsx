import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Space, Stack, Tabs } from "@mantine/core";
import { Outlet, useNavigate, useParams } from "react-router-dom";

export default function ManagementShellPage() {
  const navigate = useNavigate();
  const { tabValue } = useParams();
  return (
    <Stack gap="lg" w="100%">
      <Stack h={100} px="md" w="100%">
        <h1 className="text-5xl text-primary">Management</h1>
        <Space />
        <Tabs
          value={tabValue || "truck-catalog"}
          onChange={(value) => navigate(`${value}`)}
          w="100%"
        >
          <Tabs.List>
            <Tabs.Tab
              value="truck-catalog"
              leftSection={<FontAwesomeIcon icon={faTruckFast} />}
            >
              Truck Catalog
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Stack>
      <div className="p-5">
        <Outlet />
      </div>
    </Stack>
  );
}
