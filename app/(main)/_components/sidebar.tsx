import Link from "next/link";

const menuItems = [
  { href: "/one", label: "モデル固定" },
  { href: "/select", label: "モデル選択" },
  { href: "/compare", label: "モデル比較" },
];

export default function Sidebar() {
  return (
    <nav className="w-64 bg-gray-100 p-4">
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block p-2 hover:bg-gray-200 rounded"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
