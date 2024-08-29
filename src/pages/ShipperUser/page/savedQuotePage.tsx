import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Stack,
  TextInput,
} from "@mantine/core";
import { DatePicker, type DatesRangeValue } from "@mantine/dates";
import { listUserQuotes } from "../../../lib/apiCalls";
import { DataTable } from "mantine-datatable";
import { useQuery } from "@tanstack/react-query";
import { Quote } from "../../../utils/types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDebouncedValue } from "@mantine/hooks";

export default function SavedQuotePage() {
  return (
    <>
      <Stack px="md" w="100%" h="80vh">
        <Stack py="md" w="100%" gap={20} h="100%">
          <h1 className="text-5xl text-primary">Saved Quotes</h1>
          <Divider />
          <HistoryQuotes />
        </Stack>
      </Stack>
    </>
  );
}

function HistoryQuotes() {
  const navigate = useNavigate();
  const [originQuery, setOriginQuery] = useState("");
  const [mergedQueries, setMergedQueries] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");
  const [createdDateRange, setCreatedDateRange] = useState<DatesRangeValue>();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["listUserQuotes"],
    queryFn: () =>
      listUserQuotes({
        queries: mergedQueries,
      }),
  });
  const [originQueryDebounce] = useDebouncedValue(originQuery, 200);
  const [destinationDebounceQuery] = useDebouncedValue(destinationQuery, 200);

  const onReuseHandle = (quote: Quote) => {
    navigate(`/requests?quoteId=${quote._id}`);
  };

  useEffect(() => {
    const queries: string[] = [];
    if (originQueryDebounce) {
      queries.push(`origin=${originQueryDebounce}`);
    }
    if (destinationDebounceQuery) {
      queries.push(`destination=${destinationDebounceQuery}`);
    }

    if (createdDateRange) {
      if (createdDateRange[0]) {
        queries.push(`createdStartDate=${createdDateRange[0].toISOString()}`);
      }
      if (createdDateRange[1]) {
        queries.push(`createdEndDate=${createdDateRange[1].toISOString()}`);
      }
    }
    const mergedQueries = queries.join("&");
    console.log(createdDateRange?.[0]?.toUTCString());
    setMergedQueries(mergedQueries);
  }, [originQueryDebounce, destinationDebounceQuery, createdDateRange]);

  useEffect(() => {
    refetch();
  }, [mergedQueries, refetch]);
  return (
    <>
      <DataTable
        height={800}
        columns={[
          {
            accessor: "origin",
            width: 300,
            filter: (
              <TextInput
                label="Origin"
                description="Search by origin"
                placeholder="Search origin..."
                leftSection={<FontAwesomeIcon icon={faSearch} />}
                rightSection={
                  <ActionIcon
                    size="sm"
                    variant="transparent"
                    c="dimmed"
                    onClick={() => setOriginQuery("")}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </ActionIcon>
                }
                value={originQuery}
                onChange={(e) => setOriginQuery(e.currentTarget.value)}
              />
            ),
            filtering: originQuery !== "",
          },
          {
            accessor: "destination",
            width: 300,
            filter: (
              <TextInput
                label="Destination"
                description="Search by destination"
                placeholder="Search destination..."
                leftSection={<FontAwesomeIcon icon={faSearch} />}
                rightSection={
                  <ActionIcon
                    size="sm"
                    variant="transparent"
                    c="dimmed"
                    onClick={() => setDestinationQuery("")}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </ActionIcon>
                }
                value={destinationQuery}
                onChange={(e) => setDestinationQuery(e.currentTarget.value)}
              />
            ),
            filtering: destinationQuery !== "",
          },

          {
            accessor: "trailer",
            render: (quote) => `${quote.trailerType} (${quote.trailerSize})`,
          },
          {
            accessor: "Date Created",
            render: (quote) =>
              new Date(quote.createdAt ?? "").toLocaleDateString(),
            filter: ({ close }) => (
              <Stack>
                <DatePicker
                  maxDate={new Date()}
                  type="range"
                  value={createdDateRange}
                  onChange={setCreatedDateRange}
                />
                <Button
                  disabled={!createdDateRange}
                  variant="light"
                  onClick={() => {
                    setCreatedDateRange(undefined);
                    close();
                  }}
                >
                  Clear
                </Button>
              </Stack>
            ),
            filtering: Boolean(createdDateRange),
          },
          {
            accessor: "price",
            render: (quote) => `$${quote.price}`,
          },
          {
            accessor: "packaging",
          },
          {
            accessor: "actions",
            width: "0%",
            render: (quote) => (
              <>
                <Group key={quote._id!} gap={14}>
                  <Button size="xs" onClick={() => onReuseHandle(quote)}>
                    Reuse
                  </Button>
                </Group>
              </>
            ),
          },
        ]}
        striped={true}
        highlightOnHover
        records={data}
        fetching={isLoading}
        idAccessor={"_id"}
      />
    </>
  );
}
