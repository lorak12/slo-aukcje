import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Home() {
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ];

  return (
    <main className="grid grid-cols-2 m-12 min-h-[calc(100vh-200px)] gap-8">
      <section className="flex flex-col gap-6">
        <h1>
          Nieprzygotowanie Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Eligendi natus voluptatem.
        </h1>
        <h2>Cena wywoławcza: 150zł</h2>
        <h2>Minimalna wartość przebicia: 100zł</h2>
      </section>
      <section className="flex justify-center items-center flex-col">
        <div className="border p-4 rounded-xl w-[500px] h-fit scale-150 flex flex-col items-center justify-center">
          <h2>Aktualnie 2C daje 2500zł</h2>
          <Table className="max-w-[500px]">
            <TableHeader>
              <TableRow>
                <TableHead>Klasa</TableHead>
                <TableHead className="text-right">Aktualna Cena</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell className="text-right">
                    {invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  );
}
