import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppShell, Flex, useMatches } from "@mantine/core";
import { Outlet, useNavigate } from "react-router-dom";
import useDistanceCalculator from "../../hooks/useDistanceCalculator";
import { useEffect } from "react";

export default function ShipmentRequestShellPage() {
  const headerVisible = useMatches({
    xs: false,
    lg: true,
  });
  const asideVisible = useMatches({
    xs: true,

    lg: false,
  });

  const { dispose } = useDistanceCalculator();

  useEffect(() => {
    return () => {
      // sessionStorage.removeItem("distanceCalculatorData");
      dispose();
    };
  }, []);
  return (
    <section>
      <AppShell
        header={{ height: 60, collapsed: headerVisible }}
        navbar={{
          width: {
            base: 350,
          },
          breakpoint: "sm",
          collapsed: {
            mobile: asideVisible,
            desktop: asideVisible,
          },
        }}
      >
        {!headerVisible && (
          <AppShell.Header>
            <ShellHeader />
          </AppShell.Header>
        )}
        <AppShell.Navbar>
          <Aside />
        </AppShell.Navbar>

        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </section>
  );
}
function Aside() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };
  return (
    <div className="dark:bg-gray-900 dark:border-gray-700 flex flex-col  h-full p-5 w-full">
      {/* Back Button */}
      <div
        className="flex items-center text-white cursor-pointer mb-8 mt-20"
        onClick={handleBackClick}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        <span>Return Back</span>
      </div>

      {/* Title */}
      <h1 className="text-white text-2xl font-semibold mb-4">
        Manage Your Freight Quote Requests
      </h1>

      {/* Description */}
      <p className="text-gray-300 text-sm">
        Easily manage and track your freight quotes. Get detailed estimates
        based on your cargo and route.
      </p>
    </div>
  );
}
function ShellHeader() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <Flex
      px={"lg"}
      py={"xl"}
      className="dark:bg-gray-900 dark:border-gray-700 h-full"
    >
      <div
        className="flex items-center text-white cursor-pointer"
        onClick={handleBackClick}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        <span>Return Back</span>
      </div>
    </Flex>
  );
}
