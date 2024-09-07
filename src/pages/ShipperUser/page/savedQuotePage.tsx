import { ActionIcon, Button, Divider, Stack, TextInput } from "@mantine/core";
import { DatePicker, type DatesRangeValue } from "@mantine/dates";
import { listUserQuotes } from "../../../lib/apiCalls";
// import { DataTable } from "mantine-datatable";
import { useQuery } from "@tanstack/react-query";
import { Quote } from "../../../utils/types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesDown,
  faMapMarkerAlt,
  faSearch,
  faSyncAlt,
  faTimes,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { useDebouncedValue } from "@mantine/hooks";

export default function SavedQuotePage() {
  return (
    <>
      <Stack px="md" w="100%" h="80vh">
        <Stack py="md" w="100%" gap={20} h="100%">
          <h1 className="text-5xl text-primary">Saved Routes</h1>
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Card Layout */}
        <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 py-8 bg-light-grey rounded-lg lg:px-10">
          {filteredData.map((quote) => (
            <div
              key={quote._id}
              className="border bg-white lg:mx-4 rounded-lg shadow-xl p-6 lg:px-8  flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              {/* Origin and Destination with Arrow */}
              <div className="items-center justify-between mb-8">
                <div className="flex items-center space-x-2 my-2">
                  <div className="bg-primary w-6 h-6 flex items-center justify-center rounded-full">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-white w-3 h-3"
                    />
                  </div>
                  <p className="font-semibold text-lg">
                    {quote.origin.length > 25
                      ? `${quote.origin.slice(0, 25)}...`
                      : quote.origin}
                  </p>
                </div>
                <div className="flex justify-start my-4">
                  <div className="">
                    <FontAwesomeIcon
                      icon={faAnglesDown}
                      className="text-secondary w-6 h-6"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2 my-2">
                  <div className="bg-gray-500 w-6 h-6 flex items-center justify-center rounded-full">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-white w-3 h-3"
                    />
                  </div>
                  <p className="font-semibold text-lg">
                    {quote.destination.length > 25
                      ? `${quote.destination.slice(0, 25)}...`
                      : quote.destination}
                  </p>
                </div>
              </div>

              {/* Trailer Type and Size */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gray-400 w-6 h-6 flex items-center justify-center rounded-full">
                  <FontAwesomeIcon
                    icon={faTruck}
                    className="text-white w-3 h-3"
                  />
                </div>
                <p className="text-sm text-gray-700 font-medium">
                  {quote.trailerType} ({quote.trailerSize})
                </p>
              </div>

              {/* Optional Data Points */}
              {/* Uncomment if needed */}
              {/* 
      <div className="flex items-center space-x-2 mb-4">
        <div className="bg-purple-500 w-10 h-10 flex items-center justify-center rounded-full">
          <FontAwesomeIcon icon={faCalendarAlt} className="text-white" />
        </div>
        <p className="text-sm text-gray-700">
          Created on {new Date(quote.createdAt ?? "").toLocaleDateString()}
        </p>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <div className="bg-yellow-500 w-10 h-10 flex items-center justify-center rounded-full">
          <FontAwesomeIcon icon={faDollarSign} className="text-white" />
        </div>
        <p className="text-sm text-gray-700">${quote.price}</p>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <div className="bg-teal-500 w-10 h-10 flex items-center justify-center rounded-full">
          <FontAwesomeIcon icon={faBoxOpen} className="text-white" />
        </div>
        <p className="text-sm text-gray-700">{quote.packaging}</p>
      </div> 
      */}

              {/* Action Buttons */}
              <div className="mt-2 flex justify-end">
                <button
                  className="w-full bg-primary text-white rounded-md px-4 py-3 hover:bg-secondary transition-colors"
                  onClick={() => onReuseHandle(quote)}
                >
                  <FontAwesomeIcon icon={faSyncAlt} className="mr-2" />
                  Reuse
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Inputs */}
        <div className="lg:px-12 col-span-1 p-8 rounded-lg  bg-light-grey h-50">
          <div>
            {/* Origin Filter */}
            <TextInput
              label="Origin" 
              className="lg:w-full"
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
              className="lg:w-full"
              // description="Search by destination"
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
            {/* Date Range Filter */}
          <Stack className="mt-4">
            <DatePicker
              maxDate={new Date()}
              type="range"
              value={createdDateRange}
              onChange={setCreatedDateRange}
              className=""
            />
            <Button
              disabled={!createdDateRange}
              variant="light"
              onClick={() => {
                setCreatedDateRange(undefined);
              }}
              className="w-1/2 mt-4"
            >
              Clear
            </Button>
          </Stack>
          </div>

          
        </div>

        
      </div>
    </>
  );
}
