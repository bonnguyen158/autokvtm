import sys
import os
from PyQt6.QtWidgets import QApplication
from PyQt6.QtGui import QIcon
from scripts.gui.main_window import MainWindow

def run():
    # Xác định thư mục chứa file chạy (.exe hoặc .py)
    if getattr(sys, 'frozen', False):
        exe_dir = os.path.dirname(sys.executable)
    else:
        exe_dir = os.path.dirname(os.path.abspath(sys.argv[0] if sys.argv[0] else __file__))
        # Khi chạy từ e:\LDPlayer\dev\gui.py, exe_dir sẽ là e:\LDPlayer\dev
    
    app = QApplication(sys.argv)
    
    icon_path = os.path.join(exe_dir, "logo-tool.ico")
    if os.path.exists(icon_path):
        app.setWindowIcon(QIcon(icon_path))
        try:
            import ctypes
            ctypes.windll.shell32.SetCurrentProcessExplicitAppUserModelID('kvtm.launcher.pyqt6')
        except Exception:
            pass
    window = MainWindow(exe_dir)
    window.show()
    sys.exit(app.exec())
