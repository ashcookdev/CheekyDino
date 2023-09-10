import java.io.FileOutputStream;
import java.io.OutputStream;

public class DrawerOpener {
    public void openDrawer(String printerName) {
        try {
            byte[] openCommand = {0x1B, 0x70, 0x00}; // ESC p 0
            OutputStream printerOutput = new FileOutputStream(printerName);
            printerOutput.write(openCommand);
            printerOutput.flush();
            printerOutput.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
