from pathlib import Path

from homeassistant.core import HomeAssistant
from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
import logging
from .const import FRONTEND_SCRIPT_URL


_LOGGER = logging.getLogger(__name__)


async def setup_view(hass: HomeAssistant):
    path_to_file = Path(__file__).parent / "home-assistant-neerslag-card/neerslag-card.js"
    should_cache = False

    await hass.http.async_register_static_paths([StaticPathConfig(FRONTEND_SCRIPT_URL, str(path_to_file), should_cache)])
    add_extra_js_url(hass, FRONTEND_SCRIPT_URL , es5=False)