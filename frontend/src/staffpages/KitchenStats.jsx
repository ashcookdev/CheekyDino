

export default function KitchenStats({ stats}) {
    

return (
     <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white px-4 py-6 sm:px-6 lg:px-8">
              <p className="text-sm font-medium leading-6 text-purple-600">{stat.name}</p>
              <p className="mt-2 flex items-baseline gap-x-2 bg-white">
                <span className="text-4xl font-semibold tracking-tight text-purple-600">{stat.value}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
);
}