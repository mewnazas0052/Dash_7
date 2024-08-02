import { useState, useEffect } from "react";
import { useColorMode, Button } from "@chakra-ui/react";

function Test() {
  const [mounted, setMounted] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode(); // เปลี่ยน useTheme เป็น useColorMode สำหรับ Chakra UI

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div>
      The current theme is: {colorMode} {/* เปลี่ยน theme เป็น colorMode */}
      <Button onClick={toggleColorMode}>Toggle Theme</Button> {/* ใช้ Button จาก Chakra UI */}
    </div>
  );
}

export default Test;
