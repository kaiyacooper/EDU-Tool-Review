var Config = (function () {
  const props = PropertiesService.getScriptProperties();
  return {
    get: function (name, fallback = null) {
      const value = props.getProperty(name);
      return (value === null || value === undefined) ? fallback : value;
    }
  };
})();
