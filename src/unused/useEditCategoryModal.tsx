import { StyleSheet, View } from 'react-native';
import { Input } from '../components/Input';
import useModal from '../context/ui/useModal';
import { Category } from '../model/types';

interface EditCategoryModalProps {
    category: Category;
    title: string;
};

export default function useEditCategoryModal({ category, title }: EditCategoryModalProps) {

    // const [selectedUnit, setSelectedUnit] = useState<OptionType<Unit> | undefined>();



    const editCategoryForm = (
        <View style={styles.container}>
            <Input label={"Name"} initialValue={"goal?.title"} placeHolder={"What goal are you chasing?"}></Input>


        </View>
    )

    const { Modal, openModal, closeModal, isOpened } = useModal({ headerText: title, content: editCategoryForm, onDelete: () => { } });

    return {
        EditCategoryModal: Modal,
        openModal,
        closeModal,
        isOpened
    };
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 20,

    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    current: {
        marginRight: 15,
    },


});