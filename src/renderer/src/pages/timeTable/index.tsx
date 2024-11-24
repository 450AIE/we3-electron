import useUpdateStateSync from '@renderer/hooks/useUpdateStateSync';

export default function TimeTable() {
    useUpdateStateSync();

    return <div>这是课表</div>;
}
