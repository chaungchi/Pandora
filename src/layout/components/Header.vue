<script lang="jsx">
import { computed } from "vue";
import SetIsDark from "#/SetIsDark";
// import SetLanguage from "#/SetLanguage";
import SetTheme from "#/SetTheme";
import Logout from "./Logout.vue";
import Logo from "@/layout/components/Logo";
import H5Label from "#/H5Label";
import { useAppStore } from "@/store/modules/app";
import Menus from "./Menus";
const appStore = useAppStore();
const h5 = computed(() => appStore.getH5);
const eq = computed(() => appStore.getEquipment);
const dir = computed(() => appStore.getDirection);
export default {
  setup() {
    return () =>
      eq.value == "h5" ? (
        <div class="w100% h100% bet">
          <div></div>
          {/* <div class="w$hh h$hh  bg-atcolor">
            <Menus />
          </div> */}
          <div class="wa h$hh flex">
            <Logo />
          </div>
        </div>
      ) : (
        <div class="w100% h100% bet">
          <div class="wa h$hh flex">
            <Logo />
            {/* <H5Label /> */}
          </div>
          <div class="flex">
            {/* <div class="w$hh h$hh">
              <SetLanguage />
            </div> */}
            <div class="w$hh h$hh">
              <SetIsDark />
            </div>
            <div class="w$hh h$hh">
              <SetTheme />
            </div>
            <div class="w$hh h$hh">
              <Logout />
            </div>
          </div>
        </div>
      );
  }
};
</script>
