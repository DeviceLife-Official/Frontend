import { useEffect, useMemo, useState } from 'react';

type UseCombinationNameInputParams = {
  inputRef: React.RefObject<HTMLInputElement | null>;
  existingNames?: string[];
  maxLen?: number;
};

type ErrorType = 'invalidChar' | 'tooLong' | 'onlySpace' | 'duplicate' | null;

const DEFAULT_MAX_LEN = 20;
const ALLOWED_REGEX = /^[가-힣a-zA-Z0-9 ]*$/;
const DISALLOWED_GLOBAL = /[^가-힣a-zA-Z0-9 ]/g;

export const useCombinationNameInput = ({
  inputRef,
  existingNames = [],
  maxLen = DEFAULT_MAX_LEN,
}: UseCombinationNameInputParams) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<ErrorType>(null);
  const [isComposing, setIsComposing] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const normalizedExisting = useMemo(() => existingNames.map((v) => v.trim()), [existingNames]);

  const validate = (next: string): ErrorType => {
    if (!ALLOWED_REGEX.test(next)) return 'invalidChar';
    if (next.length > maxLen) return 'tooLong';
    if (next.trim().length === 0) return 'onlySpace';
    if (normalizedExisting.includes(next.trim())) return 'duplicate';
    return null;
  };

  const sanitize = (raw: string) => {
    const removedInvalid = raw.replace(DISALLOWED_GLOBAL, '');
    const sliced = removedInvalid.slice(0, maxLen);
    return {
      sanitized: sliced,
      hadInvalid: removedInvalid !== raw,
      wasTooLong: removedInvalid.length > maxLen,
    };
  };

  const apply = (raw: string) => {
    const { sanitized, hadInvalid, wasTooLong } = sanitize(raw);
    setValue(sanitized);

    if (hadInvalid) {
      setError('invalidChar');
      return;
    }
    if (wasTooLong) {
      setError('tooLong');
      return;
    }

    setError(validate(sanitized));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (isComposing) {
      setValue(raw);
      return;
    }
    apply(raw);
  };

  const onCompositionStart = () => setIsComposing(true);

  const onCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false);
    apply(e.currentTarget.value);
  };

  const isValid = useMemo(() => validate(value) === null, [value]);

  const errorMessage = useMemo(() => {
    switch (error) {
      case 'invalidChar':
        return '특수문자나 이모지는 사용할 수 없습니다.';
      case 'tooLong':
        return `조합명은 최대 ${maxLen}자까지 입력 가능합니다.`;
      case 'onlySpace':
        return '조합명을 한 글자 이상 입력해주세요.';
      case 'duplicate':
        return '이미 존재하는 조합명입니다. 다른 이름을 시도해주세요.';
      default:
        return null;
    }
  }, [error, maxLen]);

  return {
    value,
    onChange,
    onCompositionStart,
    onCompositionEnd,
    error,
    errorMessage,
    isValid,
    validate,
    setValue,
  };
};
