import { describe, expect, it } from 'vitest';
import { fromChatKit } from '../src/compat/chatkit';

describe('fromChatKit', () => {
  it('maps common action prop names into the internal widget format', () => {
    const template = fromChatKit({
      type: 'Button',
      title: 'Save',
      onClick: {
        type: 'submit_form',
        handling: 'server',
      },
    });

    expect(template.type).toBe('Button');
    expect(template.label).toBe('Save');
    expect(template.onClickAction).toEqual({
      type: 'submit_form',
      handling: 'server',
    });
  });
});
