import renderer from 'react-test-renderer';

import { ConfirmModal } from './ConfirmModal';

describe('ConfirmModal', () => {  
  it('component should match snapshot', () => {
    const jsxElement = <ConfirmModal content={'Are you sure'} show={false} onConfirm={jest.fn()} onCancel={jest.fn()} />;
    const tree = renderer.create(jsxElement).toJSON();
    expect(tree).toMatchSnapshot();
  });
});