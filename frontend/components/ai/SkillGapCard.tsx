interface SkillGapCardProps {
    title: string;
    items: string[];
}

export default function SkillGapCard({
    title,
    items,
}: SkillGapCardProps) {
    return (
        <div className= "rounded-xl border p-6 shadow-sm" >
        <h2 className="mb-4 text-xl font-semibold" > { title } </h2>

    {
        items.length === 0 ? (
            <p className= "text-gray-500" > No data available.</p>
      ) : (
            <ul className= "space-y-2" >
            {
                items.map((item, index) => (
                    <li key= { index } >• { item } </li>
                ))
            }
            </ul>
      )
    }
    </div>
  );
}