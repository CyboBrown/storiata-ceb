import { Session } from "@supabase/supabase-js";
import { Button, H5, Paragraph, YStack, Accordion, Square } from "tamagui";
import { ChevronDown } from "@tamagui/lucide-icons";

export default function Exercises({ session }: { session: Session }) {
  return (
    <YStack
      f={1}
      jc="flex-start"
      ai="stretch"
      backgroundColor={"$backgroundSoft"}
    >
      <Accordion overflow="hidden" type="multiple">
        <Accordion.Item value="a1">
          <Accordion.Trigger flexDirection="row" justifyContent="space-between">
            {({ open }) => (
              <>
                <Paragraph>Vocabulary</Paragraph>
                <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
                  <ChevronDown size="$1" />
                </Square>
              </>
            )}
          </Accordion.Trigger>
          <Accordion.Content>
            <Paragraph>
              A list of vocabulary exercises will be displayed here.
            </Paragraph>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="a2">
          <Accordion.Trigger flexDirection="row" justifyContent="space-between">
            {({ open }) => (
              <>
                <Paragraph>Grammar</Paragraph>
                <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
                  <ChevronDown size="$1" />
                </Square>
              </>
            )}
          </Accordion.Trigger>
          <Accordion.Content>
            <Paragraph>
              A list of grammar exercises will be displayed here.
            </Paragraph>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="a3">
          <Accordion.Trigger flexDirection="row" justifyContent="space-between">
            {({ open }) => (
              <>
                <Paragraph>Listening</Paragraph>
                <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
                  <ChevronDown size="$1" />
                </Square>
              </>
            )}
          </Accordion.Trigger>
          <Accordion.Content>
            <Paragraph>
              A list of listening exercises will be displayed here.
            </Paragraph>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="a4">
          <Accordion.Trigger flexDirection="row" justifyContent="space-between">
            {({ open }) => (
              <>
                <Paragraph>Speaking</Paragraph>
                <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
                  <ChevronDown size="$1" />
                </Square>
              </>
            )}
          </Accordion.Trigger>
          <Accordion.Content>
            <Paragraph>
              A list of speaking exercises will be displayed here.
            </Paragraph>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </YStack>
  );
}
