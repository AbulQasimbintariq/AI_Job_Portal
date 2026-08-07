interface CareerAdviceCardProps {
    title: string;
    content: string | string[];
}

export default function CareerAdviceCard({
    title,
    content,
}: CareerAdviceCardProps) {
    return (
        <div className= "rounded-xl border bg-white p-6 shadow-sm" >

        <h2 className="mb-4 text-xl font-bold" >
            { title }
            </h2>

    {
        Array.isArray(content) ? (
            <ul className= "space-y-2" >
            {
                content.map((item, index) => (
                    <li key= { index } >
              • { item }
                    </li>
                ))
            }
            </ul>
      ) : (
            <p className= "leading-7" >
            { content }
            </p>
      )
    }

    </div>
  );
}