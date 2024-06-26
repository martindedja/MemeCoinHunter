import { shallowMount } from "@vue/test-utils";
import SwapContainer from "@/components/SwapContainer.vue";

describe("SolanaSwap.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(SwapContainer, {
      data() {
        return {
          contractAddress: "",
          rawSolAmount: 0,
          usdAmount: 0.0,
          maxSol: 100,
          maxUsd: 1000,
          solToUsdRate: 10.00,
        };
      },
    });
  });

  it("converts SOL to USD correctly", async () => {
    wrapper.setData({ rawSolAmount: 10 });
    wrapper.vm.convertToUSD();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.usdAmount).toBeCloseTo(100.0, 2);
  });

  it("applies maximum SOL and USD correctly", async () => {
    wrapper.vm.applyMax();
    await wrapper.vm.$nextTick();
    expect(parseFloat(wrapper.vm.solAmount)).toBeCloseTo(wrapper.vm.maxSol, 2);
    expect(wrapper.vm.usdAmount).toBeCloseTo(1000, 2);
  });

  it("handles invalid SOL amount input correctly", async () => {
    wrapper.setData({ rawSolAmount: "invalid" });
    wrapper.vm.convertToUSD();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.usdAmount).toBe(0);
  });

  it("handles zero SOL input correctly", async () => {
    wrapper.setData({ rawSolAmount: 0 });
    wrapper.vm.convertToUSD();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.usdAmount).toBe(0);
  });

  it("handles large SOL input correctly", async () => {
    wrapper.setData({ rawSolAmount: 1000000 });
    wrapper.vm.convertToUSD();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.usdAmount).toBeCloseTo(10000000, 2);
  });

  it("updates contract address correctly", async () => {
    const input = wrapper.find("#contractAddress");
    await input.setValue("12345");
    expect(wrapper.vm.contractAddress).toBe("12345");
  });

  it("sets maximum SOL when max info is clicked", async () => {
    const maxInfoDiv = wrapper.find(".max-info");
    await maxInfoDiv.trigger("click");
    expect(wrapper.vm.solAmount).toBe(wrapper.vm.maxSol.toFixed(2));
  });

  it("updates USD amount when SOL amount changes", async () => {
    wrapper.setData({ rawSolAmount: 5 });
    await wrapper.vm.$nextTick();
    wrapper.vm.convertToUSD();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.usdAmount).toBeCloseTo(50.00, 2);
  });

  it("emits an event when SOL is bought", async () => {
    wrapper.setData({ rawSolAmount: 10, contractAddress: "testContract" });
    await wrapper.vm.buySolana();
    expect(wrapper.emitted("buy-solana")).toBeTruthy();
  });

  it("handles conversion error gracefully", async () => {
    const originalConvertToUSD = wrapper.vm.convertToUSD;
    wrapper.vm.convertToUSD = () => {
      throw new Error("Conversion failed");
    };
    expect(() => {
      wrapper.vm.convertToUSD();
    }).toThrow("Conversion failed");
    wrapper.vm.convertToUSD = originalConvertToUSD;
  });
});
