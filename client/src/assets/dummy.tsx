import SimpleMdeReact from 'react-simplemde-editor';

export const UsingOptions = () => {
  const [value, setValue] = useState('Initial');

  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
    } as SimpleMDE.Options;
  }, []);

  return (
    <SimpleMdeReact
      options={autofocusNoSpellcheckerOptions}
      value={value}
      onChange={onChange}
    />
  );
};
