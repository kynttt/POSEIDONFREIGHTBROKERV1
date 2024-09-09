import { ActionIcon, Divider, Stack, TextInput } from "@mantine/core";
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
      <Stack px="md" w="100%" min-h="100vh">
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
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-8  ">
        {/* Card Layout */}
        <div className="border col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-8 bg-grey rounded-lg lg:px-10 ">
          {filteredData.map((quote) => (
            <div
              key={quote._id}
              className=" bg-white lg:mx-4 rounded-md shadow-xl   flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              {/* Origin and Destination with Arrow */}
              <div className="items-center justify-between  p-6">
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
                  <p className="font-semibold text-lg text-gray-500">
                    {quote.destination.length > 25
                      ? `${quote.destination.slice(0, 25)}...`
                      : quote.destination}
                  </p>
                </div>

                {/* Trailer Type and Size */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="bg-gray-500 w-6 h-6 flex items-center justify-center rounded-full">
                    <FontAwesomeIcon
                      icon={faTruck}
                      className="text-white w-3 h-3"
                    />
                  </div>
                  <p className="font-semibold text-lg text-gray-500">
                    {quote.trailerType} ({quote.trailerSize})
                  </p>
                </div>
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
              <div className="bg-light-grey p-6 text-center rounded-b-md">
                <button
                  className="w-full bg-primary text-white rounded-sm px-4 py-3 hover:bg-secondary transition-colors"
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
        <div className="lg:px-8 col-span-1 p-4 lg:p-8 rounded-lg  bg-grey ">
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
              <div className=" bg-white p-6 rounded-md ">
                <DatePicker
                  maxDate={new Date()}
                  type="range"
                  value={createdDateRange}
                  onChange={setCreatedDateRange}
                  className=" "
                />
                <button
                  disabled={!createdDateRange}
                  onClick={() => {
                    setCreatedDateRange(undefined);
                  }}
                  className="w-full mt-4 p-2 border-2 border-primary rounded-md text-primary cursor-pointer hover:bg-secondary hover:text-white"
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
