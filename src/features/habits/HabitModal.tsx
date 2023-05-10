import { useRef } from "react";
import { StyleSheet } from "react-native";
import { GText } from "../../components/GText";
import { Icon } from "../../components/Icon";
import { BottomCard, BottomCardRef } from "../../context/ui/BottomCard";
import { BottomCardContent } from "../../context/ui/BottomCardContent";
import { Colors } from "../../util/Colors";

// type HabitsListProps = {
//     openEditHabitModal: (habit: Habit) => void
// }
export const HabitModal = () => {

    const expiringBankCardRef = useRef<BottomCardRef>(null);

    expiringBankCardRef.current?.openCard();

    const dismissExpiringBankCardWarning = () => {
        expiringBankCardRef.current?.closeCard();
    };

    return (
        <BottomCard
            ref={expiringBankCardRef}
            onDismiss={dismissExpiringBankCardWarning}>
            <GText> {"Haljuu"}</GText>
            <BottomCardContent
                headerIcon={
                    <Icon source={require("../../assets/bell.png")} />
                }
                headerText={'headerText()'}
                buttonText={'bankcard.expiry.update'}
                footerText={'button.notnow'}
                buttonAction={dismissExpiringBankCardWarning}
                footerAction={dismissExpiringBankCardWarning}
                buttonIcon={<Icon source={require("../../assets/bell.png")} />}
            />
        </BottomCard>
    );
};

const styles = StyleSheet.create({

    listItem: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center'
    },
    text: {
        marginLeft: 10,
    },
    addNewText: {
        color: Colors.grayAlpha(0.5),
    },
    habit: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    bell: {
        marginLeft: 10,
    },
});