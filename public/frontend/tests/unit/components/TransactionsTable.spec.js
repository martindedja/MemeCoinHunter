import { shallowMount } from "@vue/test-utils";
import TransactionsTable from "@/components/TransactionsTable.vue";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: 1,
          contract_address: "123xyz",
          amount_sol: 10,
          amount_usd: 1000,
          transaction_status: "completed",
          created_at: "2024-05-31T19:34:00Z",
          profit_loss: "$300 (30%)",
        },
      ]),
  })
);

describe("TransactionsTable.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TransactionsTable);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches transactions on mount", async () => {
    await wrapper.vm.$nextTick();
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/transactions`
    );
  });

  it("renders a table row for each transaction", async () => {
    await wrapper.vm.$nextTick();
    const rows = wrapper.findAll("tbody tr");
    expect(rows.length).toBe(1);
  });

  it("displays the correct data in the table cells", async () => {
    await wrapper.vm.$nextTick();
    const cells = wrapper.findAll("tbody tr:first-child td");
    expect(cells.at(0).text()).toBe("1");
    expect(cells.at(1).text()).toBe("123xyz");
    expect(cells.at(2).text()).toBe("10");
    expect(cells.at(3).text()).toBe("1000");
    expect(cells.at(4).text()).toBe("completed");
    expect(cells.at(5).text()).toBe("2024-05-31T19:34:00Z");
    expect(cells.at(6).text()).toBe("$300 (30%)");
  });
});
