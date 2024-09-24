import { ActionIcon, Stack, TextInput } from "@mantine/core";
import { DatePicker, type DatesRangeValue } from "@mantine/dates";
import { listUserQuotes } from "../../../lib/apiCalls";
// import { DataTable } from "mantine-datatable";
import { useQuery } from "@tanstack/react-query";
import { Quote } from "../../../utils/types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faAnglesDown,
  // faMapMarkerAlt,
  faSearch,
  faSyncAlt,
  faTimes,
  // faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { useDebouncedValue } from "@mantine/hooks";

export default function SavedQuotePage() {
  return (
    <>
      <Stack px="md" w="100%" min-h="100vh">
        <Stack py="md" w="100%" gap={20} h="100%">
          <h1 className="px-20 text-2xl text-primary">Saved Routes</h1>
          {/* <Divider /> */}
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
  const { data, refetch } = useQuery({
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
    setMergedQueries(mergedQueries);
  }, [originQueryDebounce, destinationDebounceQuery, createdDateRange]);

  useEffect(() => {
    refetch();
  }, [mergedQueries, refetch]);

  // Filter duplicates based on origin and destination
  const filterDuplicates = (quotes: Quote[]) => {
    const seen = new Set<string>();
    return quotes.filter((quote) => {
      const key = `${quote.origin}-${quote.destination}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  };

  const filteredData = data ? filterDuplicates(data) : [];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-4   ">
        {/* Card Layout */}
        <div className=" col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-8 bg-blue-50 h- lg:px-10 ">
          {filteredData.map((quote) => (
            <div
              key={quote._id}
              className="bg-white lg:mx-4 rounded-xl shadow-xl flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-xl"
              style={{ width: '350px', height: '280PX' }}
            >
              {/* Origin and Destination with Arrow */}
              <div className="items-center justify-between p-6">
              <div className="flex items-center space-x-2 my-2">
                <p className="font-bold text-xl text-rblue mb-4">
                {quote.companyName}
                </p>
              </div>
              <div className="flex items-center space-x-2 my-2">
                <p className="font-medium text-md text-rblue">
                {quote.origin.length > 25
                  ? `${quote.origin.slice(0, 25)}...`
                  : quote.origin}
                </p>
              </div>
              <div className="flex items-center space-x-2 my-2">
                <p className="font-medium text-md text-rblue">
                {quote.destination.length > 25
                  ? `${quote.destination.slice(0, 25)}...`
                  : quote.destination}
                </p>
              </div>

              {/* Trailer Type and Size */}
              <div className="flex items-center space-x-2 mb-4">
                <p className="font-medium text-md text-rblue">
                {quote.trailerType} ({quote.trailerSize})
                </p>
              </div>
              <div className="border-t p-5 text-center ">
              <button
                className="w-3/4 bg-rblue text-white rounded-sm px-4 py-3 hover:bg-blue-600 transition-colors rounded-xl"
                onClick={() => onReuseHandle(quote)}
              >
                <FontAwesomeIcon icon={faSyncAlt} className="mr-2" />
                Reuse
              </button>
              </div>
              </div>

             
              
            </div>
          ))}
        </div>

        {/* Filter Inputs */}
        <div className="lg:px-8 col-span-1 p-4 lg:p-8  bg-blue-50 w-full">
          <div>
            {/* Origin Filter */}
            <TextInput
              label="Origin"
              className="lg:w-full font-normal"
              // description="Search by origin"
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

            {/* Destination Filter */}
            <TextInput
              label="Destination"
              className="lg:w-full font-normal"
              // description="Search by destination"
              placeholder="Search destination"
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
            {/* Date Range Filter */}
            <Stack className=" mt-4 w-full ">
              <h1 className="font-semibold">Pick a date</h1>
                <div className="bg-white p-6 rounded-md border border-rblue flex flex-col items-center">
                <DatePicker
                  maxDate={new Date()}
                  type="range"
                  value={createdDateRange}
                  onChange={setCreatedDateRange}
                  className="text-center"
                />
                <button
                  disabled={!createdDateRange}
                  onClick={() => {
                  setCreatedDateRange(undefined);
                  }}
                  className="w-full mt-4 p-2 border-2 border-primary rounded-md text-primary cursor-pointer hover:bg-primary hover:text-white"
                >
                  Clear
                </button>
                </div>
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
}
