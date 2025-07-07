import React from "react";
import { 
  Card, 
  CardHeader, 
  CardBody, 
  Button, 
  Input, 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@heroui/react";
import { Icon } from "@iconify/react";

interface MetadataItem {
  id: string;
  name: string;
}

interface MetadataManagerProps {
  title: string;
  items: MetadataItem[];
  isLoading: boolean;
  onAdd: (name: string) => Promise<void>;
  onUpdate: (id: string, name: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const MetadataManager: React.FC<MetadataManagerProps> = ({
  title,
  items,
  isLoading,
  onAdd,
  onUpdate,
  onDelete
}) => {
  const [newItemName, setNewItemName] = React.useState("");
  const [editItem, setEditItem] = React.useState<MetadataItem | null>(null);
  const [editName, setEditName] = React.useState("");
  const [deleteItemId, setDeleteItemId] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const { 
    isOpen: isEditModalOpen, 
    onOpen: onEditModalOpen, 
    onClose: onEditModalClose 
  } = useDisclosure();
  
  const { 
    isOpen: isDeleteModalOpen, 
    onOpen: onDeleteModalOpen, 
    onClose: onDeleteModalClose 
  } = useDisclosure();

  const handleAddItem = async () => {
    if (!newItemName.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onAdd(newItemName.trim());
      setNewItemName("");
    } catch (error) {
      console.error(`Failed to add ${title.toLowerCase()}:`, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditModal = (item: MetadataItem) => {
    setEditItem(item);
    setEditName(item.name);
    onEditModalOpen();
  };

  const handleUpdateItem = async () => {
    if (!editItem || !editName.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onUpdate(editItem.id, editName.trim());
      onEditModalClose();
    } catch (error) {
      console.error(`Failed to update ${title.toLowerCase()}:`, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDeleteModal = (id: string) => {
    setDeleteItemId(id);
    onDeleteModalOpen();
  };

  const handleDeleteItem = async () => {
    if (!deleteItemId) return;
    
    setIsSubmitting(true);
    try {
      await onDelete(deleteItemId);
      onDeleteModalClose();
    } catch (error) {
      console.error(`Failed to delete ${title.toLowerCase()}:`, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{title}</h3>
      </CardHeader>
      <CardBody>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder={`Add new ${title.toLowerCase()}`}
            value={newItemName}
            onValueChange={setNewItemName}
            className="flex-1"
          />
          <Button
            color="primary"
            isLoading={isSubmitting}
            onPress={handleAddItem}
            startContent={!isSubmitting && <Icon icon="lucide:plus" />}
          >
            Add
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-4 text-default-500">
            No {title.toLowerCase()} found. Add one above.
          </div>
        ) : (
          <Table removeWrapper aria-label={`${title} table`}>
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn width={100}>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        isIconOnly
                        variant="light"
                        size="sm"
                        onPress={() => openEditModal(item)}
                      >
                        <Icon icon="lucide:edit" className="text-default-500" />
                      </Button>
                      <Button
                        isIconOnly
                        variant="light"
                        size="sm"
                        onPress={() => openDeleteModal(item.id)}
                      >
                        <Icon icon="lucide:trash" className="text-danger" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardBody>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={onEditModalClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Edit {title}</ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  value={editName}
                  onValueChange={setEditName}
                  autoFocus
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  isLoading={isSubmitting}
                  onPress={handleUpdateItem}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Confirm Deletion</ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete this {title.toLowerCase()}?
                  This action cannot be undone.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  isLoading={isSubmitting}
                  onPress={handleDeleteItem}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Card>
  );
};
