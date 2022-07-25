import { useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Textarea,
  IconButton,
  useToast,
} from '@chakra-ui/react';

import { ImPencil } from 'react-icons/im';
import { SupabaseClient } from '@supabase/supabase-js';

interface Props {
  session: Session;
  supabase: SupabaseClient;
}

export const NotesDrawer = ({ session, supabase }: Props) => {
  const [notesText, setNotesText] = useState(session.notes);
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  async function updateNotes() {
    setIsLoading(true);

    const { data, error } = await supabase
      .from('Sessions')
      .update({ notes: notesText })
      .eq('id', session.id);

    if (error) {
      toast({
        title: 'An error occured',
        description: 'Something went wrong, pleaes try again',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Note successfully saved',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  }

  return (
    <>
      <IconButton
        onClick={onOpen}
        icon={<ImPencil />}
        aria-label='Open notes panel'
        size='sm'
      >
        Open
      </IconButton>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose} size='md'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Notes</DrawerHeader>

          <DrawerBody>
            <Textarea
              placeholder='Type here...'
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
            />
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant='outline'
              mr={3}
              onClick={onClose}
              isDisabled={isLoading}
            >
              Close
            </Button>
            <Button
              colorScheme='green'
              onClick={updateNotes}
              isLoading={isLoading}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
