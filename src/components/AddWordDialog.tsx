import { Plus, X } from "@tamagui/lucide-icons";
import {
  Button,
  Dialog,
  Adapt,
  Sheet,
  Fieldset,
  Label,
  Input,
  TooltipSimple,
  Paragraph,
  XStack,
  Unspaced,
} from "tamagui";
import { SelectItem } from "./SelectItem";

export default function AddWordDialog() {
  const parts_of_speech = [
    { name: "adjective" },
    { name: "noun" },
    { name: "verb" },
  ];

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button icon={Plus} size="$6" circular></Button>
      </Dialog.Trigger>
      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title>Add New Word</Dialog.Title>
          <Dialog.Description>
            Create a new word here. Click save when you're done.
          </Dialog.Description>
          <Fieldset gap="$4" horizontal>
            <Label width={160} jc="flex-end" htmlFor="normal_form_input">
              Cebuano word
            </Label>
            <Input flex={1} id="normal_form_input" defaultValue="pulong" />
          </Fieldset>
          <Fieldset gap="$4" horizontal>
            <Label width={160} jc="flex-end" htmlFor="part_of_speech_input">
              <TooltipSimple label="Choose type..." placement="bottom-start">
                Part of Speech
              </TooltipSimple>
            </Label>
            <SelectItem label={"Part of Speech"} items={parts_of_speech} />
          </Fieldset>

          <XStack alignSelf="flex-end" gap="$4">
            {/* <AddWordDialog /> */}

            <Dialog.Close displayWhenAdapted asChild>
              <Button theme="active" aria-label="Close">
                Save changes
              </Button>
            </Dialog.Close>
          </XStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                icon={X}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
