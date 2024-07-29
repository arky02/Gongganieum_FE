import { useRouter } from 'next/router';
import MetaTag from 'components/commons/MetaTag';
import CreateBuilding from 'components/pages/admin/contents/CreateBuilding';
import CreatePopup from 'components/pages/admin/contents/CreatePopup';
import ShowBuilding from 'components/pages/admin/contents/ShowBuildings';
import ShowCarousels from 'components/pages/admin/contents/ShowCarousels';
import ShowContacts from 'components/pages/admin/contents/ShowContacts';
import ShowUsers from 'components/pages/admin/contents/ShowUsers';

const AdminRouteContent = () => {
  const router = useRouter();
  const { content } = router.query;

  const getAdminContent = ({ contentParams }: { contentParams: string }) => {
    switch (contentParams) {
      case '건물 목록 조회':
        return <ShowBuilding></ShowBuilding>;
      case '새로운 건물 추가':
        return <CreateBuilding></CreateBuilding>;
      case '건물에 새 팝업 정보 추가':
        return <CreatePopup></CreatePopup>;
      case '유저 목록 조회':
        return <ShowUsers></ShowUsers>;
      case '캐러셀(배너) 목록 조회':
        return <ShowCarousels></ShowCarousels>;
      case '문의하기 목록 조회':
        return <ShowContacts></ShowContacts>;
      default:
        return <div>문제가 발생했습니다! 처음부터 다시 시작해주세요.</div>;
    }
  };
  return (
    <>
      <MetaTag title='공간이음 | 관리자' />
      <div className='flex h-full w-full flex-col items-center py-60'>
        <div className='pb-60 text-32 font-700'>{content}</div>
        {getAdminContent({ contentParams: String(content) })}
      </div>
    </>
  );
};
export default AdminRouteContent;
