<script lang="jsx">
import { computed } from "vue";
import SetIsDark from "#/SetIsDark";
import SetLanguage from "#/SetLanguage";
import SetTheme from "#/SetTheme";
import Logout from "./Logout.vue";
import Logo from "@/layout/components/Logo";
import H5Label from "#/H5Label";
import { useAppStore } from "@/store/modules/app";
import NavList from "./NavList";
import Menus from "./Menus";
const appStore = useAppStore();
const langFlag = computed(() => appStore.getLangFlag);
const h5 = computed(() => appStore.getH5);
const eq = computed(() => appStore.getEquipment);
const dir = computed(() => appStore.getDirection);
export default {
  setup() {
    return () =>
      eq.value == "h5" ? (
        <div class="w100% h100% bg-themess bet">
          <div class="wa h$hh flex">
            <Logo />
          </div>
          <div class="w$hh h$hh  bg-atcolor">
            <Menus />
          </div>
        </div>
      ) : (
        <div class="w100% h100% bet bg-themess">
          {/* <div class="wa h100% center bg-red">
            <Logo />
            {h5.value ? <H5Label /> : null}
          </div> */}
          <div class="wa h$hh flex">
            <Logo />
          </div>
          <div class="wa h100% center">
            {langFlag.value ? (
              <div class="w$hh h$hh">
                <SetLanguage />
              </div>
            ) : null}
            <div class="w$hh h$hh flex">
              <SetIsDark />
            </div>
            <div class="w$hh h$hh flex">
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
