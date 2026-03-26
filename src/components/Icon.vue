<script setup lang="ts">
    import { computed } from 'vue';
    import InfoIcon from './icons/InfoIcon.vue';
    import AgentIcon from './icons/AgentIcon.vue';
    import AnalyticsIcon from './icons/AnalyticsIcon.vue';
    import AtomIcon from './icons/AtomIcon.vue';
    import BoltIcon from './icons/BoltIcon.vue';
    import BookOpenIcon from './icons/BookOpenIcon.vue';
    import BookClosedIcon from './icons/BookClosedIcon.vue';
    import BookClockIcon from './icons/BookClockIcon.vue';
    import CalendarIcon from './icons/CalendarIcon.vue';
    import ChartIcon from './icons/ChartIcon.vue';
    import CheckIcon from './icons/CheckIcon.vue';
    import CheckCircleIcon from './icons/CheckCircleIcon.vue';
    import CheckCircleFilledIcon from './icons/CheckCircleFilledIcon.vue';
    import ChevronLeftIcon from './icons/ChevronLeftIcon.vue';
    import ChevronRightIcon from './icons/ChevronRightIcon.vue';
    import CircleQuestionIcon from './icons/CircleQuestionIcon.vue';
    import CompassIcon from './icons/CompassIcon.vue';
    import ConfettiIcon from './icons/ConfettiIcon.vue';
    import CubeIcon from './icons/CubeIcon.vue';
    import DesktopIcon from './icons/DesktopIcon.vue';
    import DocumentIcon from './icons/DocumentIcon.vue';
    import DotsHorizontalIcon from './icons/DotsHorizontalIcon.vue';
    import DotsVerticalIcon from './icons/DotsVerticalIcon.vue';
    import EmptyCircleIcon from './icons/EmptyCircleIcon.vue';
    import ExternalLinkIcon from './icons/ExternalLinkIcon.vue';
    import GlobeIcon from './icons/GlobeIcon.vue';
    import KeysIcon from './icons/KeysIcon.vue';
    import LabIcon from './icons/LabIcon.vue';
    import ImageIcon from './icons/ImageIcon.vue';
    import LifesaverIcon from './icons/LifesaverIcon.vue';
    import LightbulbIcon from './icons/LightbulbIcon.vue';
    import MailIcon from './icons/MailIcon.vue';
    import MapPinIcon from './icons/MapPinIcon.vue';
    import MapsIcon from './icons/MapsIcon.vue';
    import MobileIcon from './icons/MobileIcon.vue';
    import NotebookIcon from './icons/NotebookIcon.vue';
    import NotebookPencilIcon from './icons/NotebookPencilIcon.vue';
    import PageBlankIcon from './icons/PageBlankIcon.vue';
    import PhoneIcon from './icons/PhoneIcon.vue';
    import PlayIcon from './icons/PlayIcon.vue';
    import PlusIcon from './icons/PlusIcon.vue';
    import ProfileIcon from './icons/ProfileIcon.vue';
    import ProfileCardIcon from './icons/ProfileCardIcon.vue';
    import ReloadIcon from './icons/ReloadIcon.vue';
    import StarIcon from './icons/StarIcon.vue';
    import StarFilledIcon from './icons/StarFilledIcon.vue';
    import SearchIcon from './icons/SearchIcon.vue';
    import SparkleIcon from './icons/SparkleIcon.vue';
    import SparkleDoubleIcon from './icons/SparkleDoubleIcon.vue';
    import SquareCodeIcon from './icons/SquareCodeIcon.vue';
    import SquareImageIcon from './icons/SquareImageIcon.vue';
    import SquareTextIcon from './icons/SquareTextIcon.vue';
    import SuitcaseIcon from './icons/SuitcaseIcon.vue';
    import SettingsSliderIcon from './icons/SettingsSliderIcon.vue';
    import UserIcon from './icons/UserIcon.vue';
    import WreathIcon from './icons/WreathIcon.vue';
    import WriteIcon from './icons/WriteIcon.vue';
    import WriteAltIcon from './icons/WriteAltIcon.vue';
    import WriteAlt2Icon from './icons/WriteAlt2Icon.vue';
    import { blockVariant, cx } from '../styling/classes';
    import { textStyles } from '../styling/text';

    const props = defineProps({
        name: {
            type: String,
            required: true,
        },
        color: {
            type: [String, Object],
            default: 'prose',
        },
        size: {
            type: String, // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
            default: 'md',
        },
    });

    const icons = {
        info: InfoIcon,
        agent: AgentIcon,
        analytics: AnalyticsIcon,
        atom: AtomIcon,
        bolt: BoltIcon,
        'book-open': BookOpenIcon,
        'book-closed': BookClosedIcon,
        'book-clock': BookClockIcon,
        calendar: CalendarIcon,
        chart: ChartIcon,
        check: CheckIcon,
        'check-circle': CheckCircleIcon,
        'check-circle-filled': CheckCircleFilledIcon,
        'chevron-left': ChevronLeftIcon,
        'chevron-right': ChevronRightIcon,
        'circle-question': CircleQuestionIcon,
        compass: CompassIcon,
        confetti: ConfettiIcon,
        cube: CubeIcon,
        desktop: DesktopIcon,
        document: DocumentIcon,
        'dots-horizontal': DotsHorizontalIcon,
        'dots-vertical': DotsVerticalIcon,
        'empty-circle': EmptyCircleIcon,
        'external-link': ExternalLinkIcon,
        globe: GlobeIcon,
        keys: KeysIcon,
        lab: LabIcon,
        image: ImageIcon,
        images: ImageIcon,
        lifesaver: LifesaverIcon,
        lightbulb: LightbulbIcon,
        mail: MailIcon,
        'map-pin': MapPinIcon,
        maps: MapsIcon,
        mobile: MobileIcon,
        notebook: NotebookIcon,
        'notebook-pencil': NotebookPencilIcon,
        'page-blank': PageBlankIcon,
        phone: PhoneIcon,
        play: PlayIcon,
        plus: PlusIcon,
        profile: ProfileIcon,
        'profile-card': ProfileCardIcon,
        reload: ReloadIcon,
        star: StarIcon,
        'star-filled': StarFilledIcon,
        search: SearchIcon,
        sparkle: SparkleIcon,
        'sparkle-double': SparkleDoubleIcon,
        'square-code': SquareCodeIcon,
        'square-image': SquareImageIcon,
        'square-text': SquareTextIcon,
        suitcase: SuitcaseIcon,
        'settings-slider': SettingsSliderIcon,
        user: UserIcon,
        wreath: WreathIcon,
        write: WriteIcon,
        'write-alt': WriteAltIcon,
        'write-alt2': WriteAlt2Icon,
    }

    const iconComponent = computed(() => {
        // Fallback to HelpCircle or similar if not found?
        // For now, return the component if it exists.
        return icons[props.name] || icons.HelpCircle;
    });

    const classes = computed(() => {
        return cx(
            'genui-icon',
            blockVariant('genui-icon', 'size', props.size),
        );
    });

    const styles = computed(() => textStyles({
        color: typeof props.color === 'string' ? props.color : null,
        defaultColor: 'prose',
    }));

</script>

<template>
    <component :is="iconComponent"
               :class="classes"
               :style="styles"
    />
</template>

<style lang="scss">
@use '../styles/apprem';

.genui-icon {
    display: inline-block;
    color: currentColor;
    flex-shrink: 0;
    vertical-align: text-bottom;
}

/* Sizes */
.genui-icon--size-xs  { width: apprem.rem(0.75); height: apprem.rem(0.75); }  // 12px
.genui-icon--size-sm  { width: apprem.rem(0.875); height: apprem.rem(0.875); } // 14px
.genui-icon--size-md  { width: apprem.rem(1); height: apprem.rem(1); }       // 16px
.genui-icon--size-lg  { width: apprem.rem(1.125); height: apprem.rem(1.125); } // 18px
.genui-icon--size-xl  { width: apprem.rem(1.25); height: apprem.rem(1.25); }   // 20px
.genui-icon--size-2xl { width: apprem.rem(1.5); height: apprem.rem(1.5); }     // 24px
.genui-icon--size-3xl { width: apprem.rem(1.875); height: apprem.rem(1.875); } // 30px

</style>
