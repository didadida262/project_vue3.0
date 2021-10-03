import { ref, onMounted, onUnmounted } from 'vue';
var useClickOutside = function (dropdownRef) {
    var isClickOutside = ref(false);
    var handleToggle = function (e) {
        if (dropdownRef.value) {
            if (!dropdownRef.value.contains(e.target)) {
                isClickOutside.value = true;
            }
            else {
                isClickOutside.value = false;
            }
        }
    };
    onMounted(function () {
        document.addEventListener('click', handleToggle);
    });
    onUnmounted(function () {
        document.removeEventListener('click', handleToggle);
    });
    return isClickOutside;
};
export default useClickOutside;
//# sourceMappingURL=useClickOutside.js.map