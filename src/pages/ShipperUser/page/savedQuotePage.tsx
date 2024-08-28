import { Divider, Stack } from "@mantine/core";

export default function SavedQuotePage() {
  return (
    <>
      <Stack px="md" w="100%">
        <Stack h={100} py="md" w="100%" gap={20}>
          <h1 className="text-5xl text-primary">Saved Quotes</h1>
          <Divider />
        </Stack>
      </Stack>
    </>
  );
}
