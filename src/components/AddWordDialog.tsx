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
import { useState } from "react";
import { Word } from "../models/Word";
import { DictionaryService } from "../services/DictionaryService";
import { PartsOfSpeech } from "../utils/enums";
import { useSession } from "../contexts/AuthContext";

export default function AddWordDialog() {
  const parts_of_speech = [
    { name: "uncategorized" },
    { name: "adjective" },
    { name: "noun" },
    { name: "number" },
    { name: "verb" },
  ];

  const { getUserUUID } = useSession();
  const [word, setWord] = useState<Word>({
    added_by: null,
    created_at: "",
    description: null,
    id: -1,
    normal_form: "",
    part_of_speech: "",
    phonetic_form: "",
    representation: null,
    suffix_form: null,
    translations: null,
  });
  const [loading, setLoading] = useState(false);

  async function save() {
    console.log(word);
    setLoading(true);
    if (word) {
      let temp = { ...word };
      temp.added_by = getUserUUID();
      let data = await DictionaryService.createWord(temp);
      if (data) {
        console.log(data);
      }
    }
    setLoading(false);
    setWord({
      added_by: null,
      created_at: "",
      description: null,
      id: -1,
      normal_form: "",
      part_of_speech: "",
      phonetic_form: "",
      representation: null,
      suffix_form: null,
      translations: null,
    });
  }

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button icon={Plus} borderColor={"$color8"} size="$6" circular></Button>
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
          <Fieldset gap="$1" horizontal>
            <Label width={120} jc="flex-end" htmlFor="part_of_speech_input">
              <TooltipSimple label="Choose type..." placement="bottom-start">
                Part of Speech
              </TooltipSimple>
            </Label>
            <SelectItem
              label={"Part of Speech"}
              items={parts_of_speech}
              value={word.part_of_speech}
              onValueChange={(text) => {
                let updated_word = { ...word };
                updated_word.part_of_speech =
                  PartsOfSpeech[`${text}` as keyof typeof PartsOfSpeech];
                setWord(updated_word);
                console.log(word.part_of_speech);
              }}
            />
          </Fieldset>
          <Fieldset gap="$1" horizontal>
            <Label width={120} jc="flex-end" htmlFor="normal_form_input">
              Cebuano Word
            </Label>
            <Input
              width="100%"
              id="normal_form_input"
              defaultValue=""
              placeholder="pulong"
              value={word.normal_form}
              onChangeText={(text) => {
                let updated_word = { ...word };
                updated_word.normal_form = text;
                setWord(updated_word);
              }}
            />
          </Fieldset>
          <Fieldset gap="$1" horizontal>
            <Label width={120} jc="flex-end" htmlFor="phonetic_form_input">
              Phonetic Form
            </Label>
            <Input
              width="100%"
              id="phonetic_form_input"
              defaultValue=""
              placeholder="púluŋ"
              value={word.phonetic_form}
              onChangeText={(text) => {
                let updated_word = { ...word };
                updated_word.phonetic_form = text;
                setWord(updated_word);
              }}
            />
          </Fieldset>
          <Fieldset gap="$1" horizontal>
            <Label width={120} jc="flex-end" htmlFor="suffix_form_input">
              Suffix Form
            </Label>
            <Input
              width="100%"
              id="suffix_form_input"
              defaultValue=""
              placeholder={word.normal_form}
              value={word.suffix_form}
              onChangeText={(text) => {
                let updated_word = { ...word };
                updated_word.suffix_form = text !== "" ? text : null;
                setWord(updated_word);
              }}
            />
          </Fieldset>
          <Fieldset gap="$1" horizontal>
            <Label width={120} jc="flex-end" htmlFor="representation_input">
              Representation
            </Label>
            <Input
              width="100%"
              id="representation_input"
              defaultValue=""
              placeholder="*insert emoji here*"
              value={word.representation}
              onChangeText={(text) => {
                let updated_word = { ...word };
                updated_word.representation = text !== "" ? text : null;
                setWord(updated_word);
              }}
            />
          </Fieldset>

          <XStack alignSelf="flex-end" gap="$4">
            {/* <AddWordDialog /> */}

            <Dialog.Close displayWhenAdapted asChild>
              <Button theme="active" aria-label="Close" onPress={save}>
                Save
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
